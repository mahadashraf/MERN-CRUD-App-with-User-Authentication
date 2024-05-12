const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const UserModel = require('./models/Users');
const EmployeeModel = require('./models/Employees');
const Joi = require('joi');
const session = require('express-session');

const app = express();
// Add cache control middleware
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    next();
});

app.use(cors());
app.use(express.json());
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));
const uri = 'mongodb+srv://mahadashraf850:Alpha009@cluster0.oqyzzx1.mongodb.net/crud?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Failed to destroy session' });
        }
        return res.status(200).json({ message: 'Logged out successfully' });
    });
});



app.post("/login", (req, res) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }



    const { email, password } = req.body;
    EmployeeModel.findOne({ email })
        .then(employees => {
            if (employees) {
                if (employees.password === password) {
                    req.session.user = employees; // Save user information in session
                    return res.json("Success");
                } else {
                    return res.json("The password is incorrect");
                }
            } else {
                return res.json("No record exists");
            }
        })
        .catch(err => res.status(500).json({ error: 'Internal server error' }));
});

app.post("/register", (req, res) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    EmployeeModel.create(req.body)
        .then(employees => res.json(employees))
        .catch(err => res.status(500).json({ error: 'Internal server error' }));
});

app.post("/createUser", (req, res) => {
    UserModel.create(req.body)
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({ _id: id }, { name: req.body.name, email: req.body.email, age: req.body.age })
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.get('/', (req, res) => {
    UserModel.find({})
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById({ _id: id })
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

app.listen(3000, () => {
    console.log("Server is running");
});
