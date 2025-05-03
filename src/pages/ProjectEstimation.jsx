import React from 'react'
import { useState } from 'react'

const ProjectEstimation = () => {
    const [step, setStep] = useState(1);
    const [projectType, setProjectType] = useState('');
    const [materialType, setMaterialType] = useState('');
    const [size, setSize] = useState('');
    const [location, setLocation] = useState('');
    const [estimate, setEstimate] = useState(null);
  
    const handleNext = () => {
      setStep(step + 1);
    };
  
    const data = {
        projectType: projectType,
        materialType: materialType,
        size: size, 
        location: location
    };

    const handleSubmit = async () => {

      const response = await fetch('http://localhost:5000/api/project/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectType, materialType, size, location }),
      });
      const data = await response.json();
      setEstimate(data.estimate);
    };

  return (
    <div>
      {step === 1 && (
        <div>
          <h3>What type of project are you planning?</h3>
          <button onClick={() => setProjectType('Residential')}>Residential</button>
          <button onClick={() => setProjectType('Commercial')}>Commercial</button>
          <button onClick={() => setProjectType('Industrial')}>Industrial</button>
          <button onClick={handleNext}>Next</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <h3>What material will you use?</h3>
          <button onClick={() => setMaterialType('Concrete')}>Concrete</button>
          <button onClick={() => setMaterialType('Steel')}>Steel</button>
          <button onClick={() => setMaterialType('Wood')}>Wood</button>
          <button onClick={handleNext}>Next</button>
        </div>
      )}
      {step === 3 && (
        <div>
          <h3>What is the size of the project?</h3>
          <button onClick={() => setSize('Small')}>Small</button>
          <button onClick={() => setSize('Medium')}>Medium</button>
          <button onClick={() => setSize('Large')}>Large</button>
          <button onClick={handleNext}>Next</button>
        </div>
      )}
      {step === 4 && (
        <div>
          <h3>Where is the project located?</h3>
          <button onClick={() => setLocation('City A')}>City A</button>
          <button onClick={() => setLocation('City B')}>City B</button>
          <button onClick={() => setLocation('City C')}>City C</button>
          <button onClick={handleSubmit}>Get Estimate</button>
        </div>
      )}
      {estimate && (
        <div>
          <h3>Estimated Project Cost: ${estimate}</h3>
        </div>
      )}
    </div>
  );
}

export default ProjectEstimation
