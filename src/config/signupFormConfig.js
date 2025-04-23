const signupFormConfig ={
    firstNameInput : {
        label: "firstName",
        name : "firstName",
        id : "firstName",
        type: "text",
        placeholder: "first name",
        validations: {
            required: {
                value: true,
                message: "first name is required"
            },
            minLength: {
                value: 5,
                message: "user name length must be more than 5 character"
            }
        },
        extraClasses: "",
    },
}

export default signupFormConfig