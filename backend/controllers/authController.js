const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
require("dotenv").config();

const registerUser = async (req, res) => {
    const { username, password } = req.body;

    if(!username || !password){
        return res.status(400).json({ error: "Username and password are required" });
    } //make sure user provides a value

    try{
        const saltRounds = 10; //how strong a hash should be. 10 is a good number
        const hashedPassword = await bcrypt.hash(password, saltRounds); //hash the password

        console.log("hashed password:", hashedPassword); 

        const query = "INSERT INTO users (username, password) VALUES (?, ?)";

        db.query(query, [username, hashedPassword], (err, results) => { 
            if(err){
                return res.status(500).json({ error: err.message });
            }else{
                res.status(200).json({ message:"User registered successfully!" });
            }
        })
    }catch(error){
        res.status(500).json({error: "error hashing password"});
    }
}


const loginUser = (req, res) => {
    const { username, password} = req.body;

    if(!username || !password){
        return res.status(500).json({ error: "Username and Password are required"})
    }

    const query = "SELECT * FROM users WHERE username = ?";

    db.query(query, [username], async (err, results) => {
        if(err) return res.status(500).json({ error: "database error"})

        if(results.length === 0){
            return res.status(500).json({ error: "invalid username or password" })
        }

        const user = results[0]; //get the users stored hash password

        //compare the password and the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({ error: "Invalid Username or Password" })
        }

        //generate a jwt token

        const token = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1hr" }
        );

        res.json({ message: "Login successful", token });
    })
        
  };
  
  module.exports = { registerUser, loginUser };