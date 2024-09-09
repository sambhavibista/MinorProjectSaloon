const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
});

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'bistasamu91@gmail.com',
        pass: 'ejqq auog jwch wwif'
    },
    tls: {
        rejectUnauthorized: false
    }
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL server.');
});

app.post('/signup', (req, res) => {
    const checkEmailQuery = "SELECT * FROM login WHERE email = ?";
    const insertUserQuery = "INSERT INTO login (name, email, password) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];

    db.query(checkEmailQuery, [req.body.email], (err, result) => {
        if (err) {
            return res.json("error");
        }
        if (result.length > 0) {
            return res.json("Email already exists");
        } else {
            db.query(insertUserQuery, [values], (err, data) => {
                if (err) {
                    return res.json("error");
                }
                return res.json(data);
            });
        }
    });
});

app.post('/login', (req, res) => {
    const sql = "SELECT * from login WHERE email= ? AND password = ?";
    
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            return res.json("error");
        }
        if (data.length > 0) {
            return res.json('Success');
        } else {
            return res.json("fail");
        }
    });
});

app.post('/api', (req, res) => {
    const { name, email, phone, service, stylist, date, time, shop, message } = req.body;

    // const getStylistNameSql = "SELECT name FROM stylist WHERE id = ?";
    
    // db.query(getStylistNameSql, [stylist], (err, result) => {
    //     if (err) {
    //         console.error('Error fetching stylist name:', err);
    //         return res.status(500).json({ error: "Database error" });
    //     }

    //     const stylistName = result[0].name;

    // Check if the appointment already exists
    const checkAppointmentSql = "SELECT * FROM appointments WHERE email = ? AND service = ? AND stylist = ? AND date = ? AND time = ? AND shop = ?";
    const checkValues = [email, service, stylist, date, time, shop];


    db.query(checkAppointmentSql, checkValues, (err, results) => {
        if (err) {
            console.error('Error checking appointment:', err);
            return res.status(500).json({ error: "Database error" });
        }
        if (results.length > 0) {
            return res.status(409).json({ message: "Appointment already exists" });
        } else {
            // If appointment does not exist, insert it into the database
            const insertAppointmentSql = "INSERT INTO appointments (name, email, phone, service, stylist, date, time, shop, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            const values = [name, email, phone, service, stylist, date, time, shop, message];

            db.query(insertAppointmentSql, values, (err, data) => {
                if (err) {
                    console.error('Error inserting appointment:', err);
                    return res.status(500).json({ error: "Database error" });
                }
                console.log("Appointment insertion successful");

                // Fetch user's email from login table
                const getEmailSql = "SELECT email FROM login WHERE email = ?";
                db.query(getEmailSql, [email], (err, userData) => {
                    if (err) {
                        console.error('Error fetching user email:', err);
                        return res.json("error");
                    }
                    if (userData.length === 0) {
                        console.error('No user found with the provided email');
                        return res.json("error");
                    }
                    console.log("User email fetched");

                    const userEmail = userData[0].email;

                    // Send confirmation email
                    const mailOptions = {
                        from: 'bistasamu91@gmail.com',
                        to: userEmail,
                        subject: 'Appointment Confirmation',
                        text: `Dear ${name},\n\nYour appointment has been successfully booked.\n\nShop: ${shop}\nService: ${service}\nStylist: ${stylist}\nDate: ${date}\nTime: ${time}\n\nThank you for choosing us!\n\nBest regards,\nYour Salon Team`
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.error('Error sending email:', error);
                            return res.status(500).json({ error: "Error sending email" });
                        }
                        console.log('Email sent:', info.response);
                        return res.status(201).json({ message: "Appointment booked successfully" });
                    });
                });
            });
        }
    });
});


app.get('/api/appointments', (req, res) => {
    const sql = "SELECT * FROM appointments"; // Fetch all appointments
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching appointments:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        return res.json(results); // Return the list of appointments
    });
});

app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});
