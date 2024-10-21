import React, { useState } from 'react';
import './jobListing.css';

const programmingLanguages = [
    'JavaScript', 'Python', 'Java', 'C#', 'C++', 'Ruby', 'PHP', 'Go', 'Swift', 'Kotlin',
    'Rust', 'TypeScript', 'Scala', 'Perl', 'Dart', 'Objective-C', 'Shell', 'R', 'SQL',
];

const JobListing = () => {
    const [resume, setResume] = useState(null);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [manualSkill, setManualSkill] = useState('');
    const [manualSkills, setManualSkills] = useState([]);
    const [foundLanguages, setFoundLanguages] = useState([]);

    const jobList = [
        { id: 1, title: 'Software Engineer', skills: 'JavaScript, React, Node.js' },
        { id: 2, title: 'Data Scientist', skills: 'Python, Machine Learning' },
        { id: 3, title: 'DevOps Engineer', skills: 'AWS, Docker, Kubernetes' },
        { id: 4, title: 'Frontend Developer', skills: 'HTML, CSS, JavaScript' },
        { id: 5, title: 'Backend Developer', skills: 'Python, Django, REST API' },
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
        const found = programmingLanguages.filter(lang => text.includes(lang));
        setFoundLanguages(found);
    };

    const handleAddManualSkill = () => {
        if (manualSkill && !manualSkills.includes(manualSkill)) {
            setManualSkills([...manualSkills, manualSkill]);
            setManualSkill('');
        }
    };

    const handleFilterJobs = () => {
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

    return (
        <div className="job-listing">
            <h1>Find Your Dream Job</h1>

            <form className="job-filter-form">
                <input
                    type="file"
                    accept=".txt,.pdf,.doc,.docx"
                    onChange={handleResumeUpload}
                    className="resume-upload"
                />
                <button
                    type="button"
                    className="submit-button"
                    onClick={handleFilterJobs}
                >
                    Filter Jobs
                </button>
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

            <div className="job-container">
                {/* Filtered Job Listings */}
                {filteredJobs.length > 0 && (
                    <div className="job-results">
                        <h2>Filtered Job Listings</h2>
                        <div className="job-cards">
                            {filteredJobs.map(job => (
                                <div key={job.id} className="card">
                                    <h3>{job.title}</h3>
                                    <p>Required Skills: {job.skills}</p>
                                    <button className="apply-button">Apply</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* All Available Job Listings */}
                <div className="all-jobs small-box">
                    <h2>All Available Job Listings</h2>
                    <div className="job-cards">
                        {jobList.map(job => (
                            <div key={job.id} className="card">
                                <h3>{job.title}</h3>
                                <p>Required Skills: {job.skills}</p>
                                <button className="apply-button">Apply</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobListing;
