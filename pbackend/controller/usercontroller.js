import User from "../model/User.js";


import Studio from "../model/studio.js";
import City from "../model/City.js";
import Booking from "../model/Booking.js";


export const fetchuser = async (req, res) => {
    try {
        const id = req.params.id;
        const fetchstudio = await User.findOne({ _id: id });


        if (fetchstudio.length === 0) {
            return res.status(404).json({ message: "Studio  not found" });
        }
        res.status(200).json(fetchstudio)
    } catch (error) {
        res.status(500).json({ error: "internal Server Error" });
    }
};


export const user = async (req, res) => {
    try {
        const { email, password } = req.body; // Remove `new` keyword

        // Check if user exists in the database
        const check = await User.findOne({ email });

        if (!check) {
            return res.status(400).json({ message: "User not found" });
        }
        if (check.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
       
        return res.status(200).json({ message: "Login successful", user: check });
       

    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export const loginstudio = async (req, res) => {
    try {
        const { email, password } = req.body; // Remove `new` keyword

        // Check if user exists in the database
        const check = await Studio.findOne({ email });

        if (!check) {
            return res.status(400).json({ message: "User not found" });
        }
        if (check.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
       
        return res.status(200).json({ message: "Login successful", user: check });
       

    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const create = async (req, res) => {
    try {
        const userdata = new User(req.body);
        const email = req.body.email;
        // const exitUser= User.find(user =>user.email === email);
        //  console.log(exitUser)
        // if(exitUser)
        // {
        //    return res.status(400).json({message:"user Already Register"});
        // }
        const saveUser = await userdata.save();
        res.status(200).json(saveUser);

    } catch (error) {
        res.status(500).json({ error: "internal server Error" });
    }
}

export const fetchstudio = async (req, res) => {
    try {
        const fetchstudio = await Studio.find();
        if (fetchstudio.length === 0) {
            return res.status(404).json({ message: "user not found" });
        }
        res.status(200).json(fetchstudio)
    } catch (error) {
        res.status(500).json({ error: "internal Server Error" });
    }
};
export const fetchstudio1 = async (req, res) => {
    try {
        const id = req.params.id;
        const fetchstudio = await Studio.findOne({ _id: id });


        if (fetchstudio.length === 0) {
            return res.status(404).json({ message: "Studio  not found" });
        }
        res.status(200).json(fetchstudio)
    } catch (error) {
        res.status(500).json({ error: "internal Server Error" });
    }
};

export const createstudio = async (req, res) => {
    try {
        const { stuidoname, city, mobile, email, address,password } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // Store image path
        const serviceType="video/photo";
        // Create a new studio object
        const studiodata = new Studio({
            name: stuidoname,
            city,
            mobile,
            email,
            serviceType,
            password,
            address,
         imageUrl, // Save image URL in DB
        });

        // Save studio to the database
        const saveStudio = await studiodata.save();

        res.status(200).json({ message: "Studio Created Successfully", data: saveStudio });
    } catch (error) {
        console.error("Error creating studio:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const fetchcity = async (req, res) => {
    try {
        const fetchcity = await City.find();
        if (fetchstudio.length === 0) {
            return res.status(404).json({ message: "city not found" });
        }
        res.status(200).json(fetchcity)
    } catch (error) {
        res.status(500).json({ error: "internal Server Error" });
    }
};

export const createbooking = async (req, res) => {
    try {
        const bookingdata = new Booking(req.body);
        const saveBooking = await bookingdata.save();
        res.status(200).json(saveBooking);

    } catch (error) {
        res.status(500).json({ error: "internal server Error" });
    }
}

export const fetchbooking = async (req, res) => {
    try {
        const fetchbooking = await Booking.find();
        if (fetchbooking.length === 0) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json(fetchbooking)
    } catch (error) {
        res.status(500).json({ error: "internal Server Error" });
    }
};


export const updateBooking = async (req, res) => {
    try {
        const id = req.params.id;

        // Check if the booking exists
        const bookingExist = await Booking.findById(id);
        if (!bookingExist) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Update the Booking instead of Studio
        const updatedBooking = await Booking.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedBooking) {
            return res.status(500).json({ message: "Failed to update booking" });
        }

        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }
};

export const deleteBooking = async (req, res) => {
    try {
        const id = req.params.id;

        // Check if the booking exists
        const bookingExist = await Booking.findById(id);
        if (!bookingExist) {
            return res.status(404).json({ message: "Booking Not Found" });
        }

        // Delete the booking
        await Booking.findByIdAndDelete(id);

        return res.status(200).json({ message: "Booking deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }
};


export const updateStudio = async (req, res) => {
    try {
        const id = req.params.id;
        const studioExist = await Studio.findOne({ _id: id })
        if (!studioExist) {
            return res.status(404).json({ message: "Studio not found" });
        }
        const changeStudio = await Studio.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(changeStudio)
        // res.status(200).json({message:"done"})
    } catch (error) {
        res.status(500).json({ error: `internal Server Error ${error}` });
    }
}


export const deleteStudio = async (req, res) => {
    try {
        const id = req.params.id;
        const studioExist = await Studio.findOne({ _id: id })
        if (!studioExist) {
            return res.status(404).json({ message: "Studio not found" });
        }
        const changeStudio = await Studio.findByIdAndDelete(id)
        res.status(200).json(changeStudio)
        // res.status(200).json({message:"done"})
    } catch (error) {
        res.status(500).json({ error: `internal Server Error ${error}` });
    }
}

