// src/components/JobListing.jsx
import React, { useState } from 'react';
import './jobListing.css';

const programmingLanguages = [
    'JavaScript', 'Python', 'Java', 'C#', 'C++', 'Ruby', 'PHP', 'Go', 'Swift', 'Kotlin', 
    'Rust', 'TypeScript', 'Scala', 'Perl', 'Dart', 'Objective-C', 'Shell', 'R', 'SQL', 
    // Add more programming languages as needed
];

const JobListing = () => {
    const [resume, setResume] = useState(null);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [manualSkill, setManualSkill] = useState(''); // State for manual skill input
    const [manualSkills, setManualSkills] = useState([]); // State for list of manual skills

    // Sample job listings
    const jobList = [
        { id: 1, title: 'Software Engineer', skills: 'JavaScript, React, Node.js' },
        { id: 2, title: 'Data Scientist', skills: 'Python, Machine Learning' },
        { id: 3, title: 'DevOps Engineer', skills: 'AWS, Docker, Kubernetes' },
        { id: 4, title: 'Frontend Developer', skills: 'HTML, CSS, JavaScript' },
        { id: 5, title: 'Backend Developer', skills: 'Python, Django, REST API' },
        // Add more job listings as needed
    ];

    const handleResumeUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            const text = event.target.result;
            extractProgrammingLanguages(text);
        };
        reader.readAsText(file);
    };

    const extractProgrammingLanguages = (text) => {
        const foundLanguages = programmingLanguages.filter(lang => 
            text.includes(lang)
        );

        // Combine skills from resume and manual skills
        const allSkills = [...foundLanguages, ...manualSkills];
        filterJobs(allSkills);
    };

    const filterJobs = (skills) => {
        const skillArray = skills.map(skill => skill.trim().toLowerCase());

        const matches = jobList.filter(job =>
            skillArray.some(skill => job.skills.toLowerCase().includes(skill))
        );

        setFilteredJobs(matches);
    };

    const handleAddManualSkill = () => {
        if (manualSkill && !manualSkills.includes(manualSkill)) {
            setManualSkills([...manualSkills, manualSkill]);
            setManualSkill(''); // Clear the input field
        }
    };

    return (
        <div className="job-listing">
            <h1>Job Listings</h1>
            <form className="job-filter-form">
                <input
                    type="file"
                    accept=".txt,.pdf,.doc,.docx"
                    onChange={handleResumeUpload}
                    className="resume-upload"
                />
                <button type="button" className="submit-button">Filter Jobs</button>
            </form>

            <div className="manual-skill-input">
                <input
                    type="text"
                    value={manualSkill}
                    onChange={(e) => setManualSkill(e.target.value)}
                    placeholder="Add a skill manually"
                />
                <button type="button" onClick={handleAddManualSkill}>Add Skill</button>
            </div>

            <div>
                {manualSkills.length > 0 && (
                    <div className="added-skills">
                        <h4>Added Skills:</h4>
                        <ul>
                            {manualSkills.map((skill, index) => (
                                <li key={index}>{skill}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {filteredJobs.length > 0 && (
                <div className="job-results card">
                    <h2>Filtered Job Listings:</h2>
                    <ul>
                        {filteredJobs.map(job => (
                            <li key={job.id}>{job.title} - Required Skills: {job.skills}</li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="all-jobs card">
                <h2>All Available Job Listings:</h2>
                <ul>
                    {jobList.map(job => (
                        <li key={job.id}>{job.title} - Required Skills: {job.skills}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default JobListing;
