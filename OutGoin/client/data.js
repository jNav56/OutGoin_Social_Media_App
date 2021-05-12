export const dummyUser = {
    firstname: "",
    id: -1,
    lastname: "",
    password: "",
    username: "",
}

//hardcoded data to test front-end
const person1 = {
    firstname: "Kim",
    lastname: "Kardashian",
    username: "kimk",
    image: undefined,
};

const person2 = {
    firstname: "Emma",
    lastname: "Watson",
    username: "emmaw",
    image: undefined,
};

const person3 = {
    firstname: "Elodie",
    lastname: "Tusac",
    username: "elodietusac",
    image: undefined,
};

export const personList = [
    person1,
    person2,
    person3
]

const event1 = {
    eventName: "Bowling",
    eventLocation: "Union",
    eventDescription:"Meet in the Underground.",
    eventTime: "12:00 pm", //optional
    eventDate: "12/10/2021", //optional
    attendees: [person1],
    eventOwner: person2
}

const event2 = {
    eventName: "Paddleboarding",
    eventLocation: "ATX river",
    eventDescription:"Bring cash.",
    eventTime: "12:00 pm", //optional
    eventDate: "12/10/2022", //optional
    attendees: [],
    eventOwner: person1
}

const event3 = {
    eventName: "HEB Grocery Run",
    eventLocation: "HEB",
    eventDescription:"Pay me back for gas after! :(.",
    eventTime: "12:00 pm", //optional
    eventDate: "12/10/2021", //optional
    attendees: [],
    eventOwner: person1
}

const event4 = {
    eventName: "Dentist",
    eventLocation: "ATX Dentist",
    eventDescription:"Don't forget to put a smile on.",
    eventTime: "12:00 pm", //optional
    eventDate: "12/10/2020", //optional
    attendees: [],
    eventOwner: person2
}

export const personsList = [
    {
        ...person1
    },
    {
        ...person2
    },
];

export const eventsList = [
    {
        ...event1
    },
    {
        ...event2
    },
    {
        ...event3
    },
    {
        ...event4
    },
    {
        ...event1
    },
    {
        ...event2
    },
];