// Gym Profile Configuration
// This file contains all gym-related information used throughout the application

export const gymProfile = {
    // Basic Information
    name: "Commitfit Studio",
    tagline: "Stronger Every Day",

    // Owner Information
    owner: {
        name: "Nitin Dubey",
        role: "Founder & Head Coach",
        bio: "Passionate fitness enthusiast dedicated to transforming lives through fitness and wellness."
    },

    // Contact Information
    contact: {
        phone: "9835736553",
        email: "commitfitstudio@gmail.com",
        supportEmail: "nitinkrdubey.nkd@gmail.com"
    },

    // Address
    address: {
        line1: "Jorar Namkum",
        line2: "",
        city: "Ranchi",
        state: "Jharkhand",
        pincode: "834010",
        country: "India",
        // Formatted full address
        full: "Jorar Namkum, Ranchi, Jharkhand, India - 834010"
    },

    // Operating Hours
    hours: {
        weekday: "24/7",
        weekend: "24/7",
        description: "Open 24 hours, 7 days a week"
    },

    // Social Media Links
    social: {
        instagram: "",
        facebook: "",
        youtube: "",
        website: ""
    },

    // Facilities (can be customized)
    facilities: [
        {
            id: 1,
            name: "Strength Training Zone",
            description: "State-of-the-art equipment for building muscle and power",
            icon: "FiActivity"
        },
        {
            id: 2,
            name: "Cardio Area",
            description: "Treadmills, bikes, and ellipticals for endurance training",
            icon: "FiHeart"
        },
        {
            id: 3,
            name: "Functional Training",
            description: "Functional fitness equipment for real-world strength",
            icon: "FiTarget"
        },
        {
            id: 4,
            name: "Group Classes",
            description: "Yoga, Zumba, CrossFit, and more",
            icon: "FiUsers"
        },
        {
            id: 5,
            name: "Personal Training",
            description: "One-on-one coaching with certified trainers",
            icon: "FiUser"
        },
        {
            id: 6,
            name: "Modern Amenities",
            description: "Clean facilities with lockers and showers",
            icon: "FiCheckCircle"
        }
    ],

    // Why Choose Us (highlights)
    highlights: [
        "Certified and experienced trainers",
        "24/7 access for your convenience",
        "Affordable membership plans",
        "State-of-the-art equipment",
        "Diverse group class offerings",
        "Personalized training programs",
        "Clean and safe environment",
        "Supportive fitness community"
    ],

    // About/Story
    story: `Founded by ${this?.owner?.name || "Nitin Dubey"}, Commitfit Studio was born from a passion to make fitness accessible to everyone in Ranchi. We believe that fitness is not just about physical strength, but about building mental resilience, discipline, and a supportive community. Our mission is to help every member achieve their fitness goals in a welcoming, motivating environment.`
};

export default gymProfile;
