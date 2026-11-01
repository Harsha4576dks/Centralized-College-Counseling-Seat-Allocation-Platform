import { useEffect, useState } from "react";
import { savePreferences, getPreferenceDetails,
         updatePreferenceDetails, deletePreferenceDetails} from "../services/preferenceService";
import { getAllCollegeDetails } from "../services/collegeService";
import { getAllCollegeBranchDetails } from "../services/collegeBranchService";
import { getErrorMessage } from "../utils/errorHandler";

export const usePreferenceDetails = (studentId) => {
    const [formData, setFormData] = useState({
        student_id: studentId ? String(studentId) : "",
        college_id: "",
        college_name: "",
        college_branch_id: "",
        branch_name: "",
        preference_order: "",
    });

    const [loading, setLoading] = useState(false);
    const [loadingColleges, setLoadingColleges] = useState(true);
    const [loadingBranches, setLoadingBranches] = useState(true);
    const [success, setSuccess ] = useState("");
    const [error, setError] = useState("");
    const [collegeError, setCollegeError] = useState("");
    const [branchError, setBranchError] = useState("");
    const [colleges, setColleges] = useState([]);
    const [branches, setBranches] = useState([]);
    const [activeCollegeIndex, setActiveCollegeIndex] = useState(0);
    const [activeBranchIndex, setActiveBranchIndex] = useState(0);
    const [preferenceList,  setPreferenceList] = useState([]);

    useEffect(() => {
        let isCurrent = true;

        const fetchColleges = async () => {
            setLoadingColleges(true);
            setCollegeError("");
            try {
                const data = await getAllCollegeDetails();
                if (isCurrent) {
                    setColleges(data);
                }
            } catch (fetchError) {
                if (isCurrent) {
                    setCollegeError(`Unable to load colleges: ${getErrorMessage(fetchError)}`);
                }
            } finally {
                if (isCurrent) {
                    setLoadingColleges(false);
                }
            }
        };

        fetchColleges();
        const fetchBranches = async () => {
            setLoadingBranches(true);
            setBranchError("");
            try {
                const data = await getAllCollegeBranchDetails();
                if (isCurrent) {
                    setBranches(data);
                }
            } catch (fetchError) {
                if (isCurrent) {
                    setBranchError(`Unable to load branches: ${getErrorMessage(fetchError)}`);
                }
            } finally {
                if (isCurrent) {
                    setLoadingBranches(false);
                }
            }
        };
        fetchBranches();
        return () => {
            isCurrent = false;
        };
    }, []);

    const collegeSuggestions = formData.college_name.trim()
        ? colleges.filter((college) =>
            college.college_name.toLowerCase().startsWith(formData.college_name.trim().toLowerCase())
        ).slice(0, 8)
        : [];
    const selectedCollege = colleges.find((college) =>
        String(college.id) === formData.college_id &&
        college.college_name === formData.college_name
    );
    const branchQuery = formData.branch_name.trim().toLowerCase();
    const branchSuggestions = selectedCollege && branchQuery
        ? branches.filter((branch) =>
            String(branch.college_id) === String(selectedCollege.id) &&
            (branch.branch_name.toLowerCase().startsWith(branchQuery) ||
                String(branch.id).startsWith(formData.branch_name.trim()))
        ).sort((first, second) =>
            Number(String(second.id) === formData.branch_name.trim()) -
            Number(String(first.id) === formData.branch_name.trim())
        ).slice(0, 8)
        : [];
    const selectedBranch = selectedCollege && branches.find((branch) =>
        String(branch.id) === formData.college_branch_id &&
        String(branch.college_id) === String(selectedCollege.id) &&
        branch.branch_name === formData.branch_name
    );

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((currentFormData) => ({
            ...currentFormData,
            [name]: value,
            ...(name === "college_name" ? { college_id: "" } : {}),
            ...(name === "college_name" ? { college_branch_id: "", branch_name: "" } : {}),
            ...(name === "branch_name" ? { college_branch_id: "" } : {}),
        }));
        if (name === "college_name") {
            setActiveCollegeIndex(0);
            setActiveBranchIndex(0);
        } else if (name === "branch_name") {
            setActiveBranchIndex(0);
        }
    };

    const handleCollegeSelect = (college) => {
        setFormData((currentFormData) => ({
            ...currentFormData,
            college_id: String(college.id),
            college_name: college.college_name,
            college_branch_id: "",
            branch_name: "",
        }));
        setActiveCollegeIndex(0);
        setActiveBranchIndex(0);
    };

    const handleBranchSelect = (branch) => {
        setFormData((currentFormData) => ({
            ...currentFormData,
            college_branch_id: String(branch.id),
            branch_name: branch.branch_name,
        }));
        setActiveBranchIndex(0);
    };

    const handleCollegeKeyDown = (event) => {
        if (event.key === "ArrowDown" && collegeSuggestions.length > 0) {
            event.preventDefault();
            setActiveCollegeIndex((index) =>
                index < 0 ? 0 : (index + 1) % collegeSuggestions.length
            );
        } else if (event.key === "ArrowUp" && collegeSuggestions.length > 0) {
            event.preventDefault();
            setActiveCollegeIndex((index) =>
                index < 0
                    ? collegeSuggestions.length - 1
                    : (index - 1 + collegeSuggestions.length) % collegeSuggestions.length
            );
        } else if (event.key === "Enter" && collegeSuggestions[activeCollegeIndex]) {
            event.preventDefault();
            handleCollegeSelect(collegeSuggestions[activeCollegeIndex]);
        } else if (event.key === "Escape") {
            setActiveCollegeIndex(-1);
        }
    };

    const handleBranchKeyDown = (event) => {
        if (event.key === "ArrowDown" && branchSuggestions.length > 0) {
            event.preventDefault();
            setActiveBranchIndex((index) =>
                index < 0 ? 0 : (index + 1) % branchSuggestions.length
            );
        } else if (event.key === "ArrowUp" && branchSuggestions.length > 0) {
            event.preventDefault();
            setActiveBranchIndex((index) =>
                index < 0
                    ? branchSuggestions.length - 1
                    : (index - 1 + branchSuggestions.length) % branchSuggestions.length
            );
        } else if (event.key === "Enter" && branchSuggestions[activeBranchIndex]) {
            event.preventDefault();
            handleBranchSelect(branchSuggestions[activeBranchIndex]);
        } else if (event.key === "Escape") {
            setActiveBranchIndex(-1);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (collegeError) {
            return;
        }
        if (loadingColleges) {
            setError("Please wait for the college list to finish loading.");
            return;
        }
        if (branchError) {
            return;
        }
        if (loadingBranches) {
            setError("Please wait for the branch list to finish loading.");
            return;
        }
        if (!selectedCollege) {
            setError("Choose a college from the suggestions before saving.");
            return;
        }
        if (!selectedBranch) {
            setError("Choose a branch from the suggestions before saving.");
            return;
        }
        if (!formData.student_id) {
            setError("Enter a student ID before saving preferences.");
            return;
        }
        setLoading(true);
        setError("");
        setSuccess("");

        try{
            await savePreferences(formData);
            setSuccess("student preferences saved successfully.");
        }catch (submitError) {
            setError(getErrorMessage(submitError));
        }finally {
            setLoading(false);
        }
    };


    const fetchAllPreferences = async () => {
        setLoading(true);
        setError("");
        try{
            const data = await getPreferenceDetails();
            setPreferenceList(data);
        }catch (fetchError) {
            setError(getErrorMessage(fetchError));
        } finally {
            setLoading(false);
        }
    };



    const handleUpdate = async (preferenceId, event) => {
        event.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try{
            await updatePreferenceDetails(preferenceId, formData);
            setSuccess("preference details updated successfully");
        }catch (updateError) {
            setError(getErrorMessage(updateError));
        } finally {
            setLoading(false);
        }
    };


    const handleDelete = async (preferenceId) => {
        if (! window.confirm("Are you sure you want to delete this preference ")) return;
        setLoading(true);
        setError("");
        setSuccess("");

        try{
            await deletePreferenceDetails(preferenceId);
            setSuccess("preference record deleted successfully");
            setPreferenceList((prev) => prev.filter((course_preference) => course_preference.id != preferenceId));
        }catch (deleteError) {
            setError(getErrorMessage(deleteError));
        }finally {
            setLoading(false);
        }
    };

    return {formData, handleChange, handleSubmit, fetchAllPreferences,
         updatePreferenceDetails, deletePreferenceDetails, 
         handleUpdate, handleDelete, setFormData, preferenceList, loading, success, error,
         collegeSuggestions, collegeError, loadingColleges, activeCollegeIndex,
         selectedCollege, handleCollegeSelect, handleCollegeKeyDown,
         branchSuggestions, branchError, loadingBranches, activeBranchIndex,
         selectedBranch, handleBranchSelect, handleBranchKeyDown };
};