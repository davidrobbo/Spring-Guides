export default [
    {
        id: 1,
        name: "Menu selector",
        component: "menuselector",
        defaultData: {
            menus: []
        },
        requiresLoad: true // Will need to load menus
    },
    {
        id: 2,
        name: "Gallery Selector",
        component: "galleryselector",
        defaultData: {
            gallery: "",
            type: ""
        },
        requiresLoad: true // Will need to load gallery and images
    },
    {
        id: 3,
        name: "About us fields",
        component: "aboutus",
        defaultData: {
            venue: "",
            company: "",
            staff: []
        },
        requiresLoad: false // All info contained in page contents
    },
    {
        id: 4,
        name: "Events wizard",
        component: "events",
        defaultData: {
            events: []
        },
        requiresLoad: true // Load events models
    },
    //DO THE 2 BELOW
    {
        id: 5,
        name: "Locations",
        component: 'locations',
        defaultData: {
            locations: [],
            pc: "",
            loc: ""
        },
        requiresLoad: false //
    },
    {
        id: 6,
        name: "Contact form",
        component: "contactform",
        defaultData: {
            sendTo: [],
            email: ""
        },
        requiresLoad: false // On form submit, this can be checked on backend along with a default email address
    }
]