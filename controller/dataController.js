import Data from "../model/Data.js";

// draft
export const saveDraft = async (req, res) => {
    try {
        const userId = req.user;
        const { name, email, password, country, hobbies, isActive, currentStep } = req.body;

        // check user ka form pehle se hai ya nahi
        let existingDraft = await Data.findOne({ user: userId });

        if (existingDraft) {  // update existing draft
            existingDraft.name = name ?? existingDraft.name;
            existingDraft.email = email ?? existingDraft.email;
            existingDraft.password = password ?? existingDraft.password;
            existingDraft.country = country ?? existingDraft.country;
            existingDraft.hobbies = hobbies ?? existingDraft.hobbies;
            existingDraft.isActive = isActive ?? existingDraft.isActive;
            existingDraft.currentStep = currentStep ?? existingDraft.currentStep;
            existingDraft.status = "draft";

            await existingDraft.save();
            return res.status(200).json({ success: true, message: "Draft updated", data: existingDraft });

        } else {  // yadi nhi hai to naya draft
            const newDraft = new Data({ user: userId, name, email, password, country, hobbies, isActive, currentStep, status: "draft" });
            let newDraftData = await newDraft.save();

            res.status(200).json({ success: true, message: "Draft saved successfully", newDraftData });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
}


// get draft
export const getDraft = async (req, res) => {
    try {
        const userId = req.user;
        const draft = await Data.findOne({ user: userId, status: "draft" });

        if (!draft) {
            return res.status(200).json({ success: true, message: "No draft found", data: null });
        }

        res.status(200).json({ success: true, message: "Draft fetched successfully", data: draft });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
};



// final submit
export const submitForm = async (req, res) => {
    try {
        const userId = req.user;
        const { name, email, password, country, hobbies, isActive, currentStep } = req.body;

        // check if draft exists
        let existForm = await Data.findOne({ user: userId, status: "draft" });

        if (existForm) {
            // draft exists → update & submit
            existForm.name = name ?? existForm.name;
            existForm.email = email ?? existForm.email;
            existForm.password = password ?? existForm.password;
            existForm.country = country ?? existForm.country;
            existForm.hobbies = hobbies ?? existForm.hobbies;
            existForm.isActive = isActive ?? existForm.isActive;
            existForm.currentStep = currentStep ?? existForm.currentStep;
            existForm.status = "submitted";
            await existForm.save();

            return res.status(200).json({ success: true, message: "Form submitted successfully", data: existForm });
        }

        // no draft → create new final form
        const newForm = new Data({ user: userId, name, email, password, country, hobbies, isActive, currentStep, status: "submitted" });
        let newFormData = await newForm.save();

        res.status(200).json({ success: true, message: "Form submitted successfully", data: newFormData });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
};



// // frontend code data get
// // Step 1
// const [name, setName] = useState("");
// const [email, setEmail] = useState("");
// const [password, setPassword] = useState("");
// <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
// <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
// <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />


// // Step 2
// // Country (multi-select)
// const handleCountryChange = (c) => {
//   setCountry(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
// };

// // Hobbies (checkbox)
// const handleHobbiesChange = (hobby) => {
//   setHobbies(prev => prev.includes(hobby) ? prev.filter(x => x !== hobby) : [...prev, hobby]);
// };

// const [country, setCountry] = useState([]); // multi-select
// const [hobbies, setHobbies] = useState([]); // multi-checkbox

// <div>
//       <h3>Select Countries</h3>
//       <label>
//         <input 
//           type="checkbox" 
//           value="India" 
//           checked={country.includes("India")} 
//           onChange={() => handleCountryChange("India")} 
//         /> India
//       </label>
//       <label>
//         <input 
//           type="checkbox" 
//           value="USA" 
//           checked={country.includes("USA")} 
//           onChange={() => handleCountryChange("USA")} 
//         /> USA
//       </label>
//       <label>
//         <input 
//           type="checkbox" 
//           value="UK" 
//           checked={country.includes("UK")} 
//           onChange={() => handleCountryChange("UK")} 
//         /> UK
//       </label>

//       <h3>Select Hobbies</h3>
//       <label>
//         <input 
//           type="checkbox" 
//           value="Reading" 
//           checked={hobbies.includes("Reading")} 
//           onChange={() => handleHobbiesChange("Reading")} 
//         /> Reading
//       </label>
//       <label>
//         <input 
//           type="checkbox" 
//           value="Sports" 
//           checked={hobbies.includes("Sports")} 
//           onChange={() => handleHobbiesChange("Sports")} 
//         /> Sports
//       </label>
//       <label>
//         <input 
//           type="checkbox" 
//           value="Music" 
//           checked={hobbies.includes("Music")} 
//           onChange={() => handleHobbiesChange("Music")} 
//         /> Music
//       </label>

//       <div>
//         <p>Selected Countries: {country.join(", ")}</p>
//         <p>Selected Hobbies: {hobbies.join(", ")}</p>
//       </div>
//     </div>





// const [isActive, setIsActive] = useState(false); // radio
// <input type="radio" checked={isActive} onChange={() => setIsActive(true)} />
// <input type="radio" checked={!isActive} onChange={() => setIsActive(false)} />



// // for post draft
// const handleSaveDraft = async () => {
//   const formData = new FormData();

//   formData.append("name", name);
//   formData.append("email", email);
//   formData.append("password", password);
//   formData.append("country", JSON.stringify(country)); // arrays ko string me bhejna hai
//   formData.append("hobbies", JSON.stringify(hobbies));
//   formData.append("isActive", isActive);
//   formData.append("currentStep", 3); // jo bhi current step hai

//   try {
//     const res = await axios.post("/api/form/draft", formData, {
//       withCredentials: true,
//       headers: { "Content-Type": "multipart/form-data" }
//     });
//     console.log(res.data);
//   } catch (err) {
//     console.error(err);
//   }
// };


// // FINAL SUBMIT

// const handleFinalSubmit = async () => {
//   const formData = new FormData();

//   formData.append("name", name);
//   formData.append("email", email);
//   formData.append("password", password);
//   formData.append("country", JSON.stringify(country));
//   formData.append("hobbies", JSON.stringify(hobbies));
//   formData.append("isActive", isActive);
//   formData.append("currentStep", 5);

//   try {
//     const res = await axios.post("/api/form/submit", formData, {
//       withCredentials: true,
//       headers: { "Content-Type": "multipart/form-data" }
//     });
//     console.log(res.data);
//   } catch (err) {
//     console.error(err);
//   }
// };
