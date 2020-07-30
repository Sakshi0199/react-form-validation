export default function validate(values) {
    let errors = {};
    Object.keys(values).forEach(key => {
        if (key === 'song' && !values.song.size)
            errors[key] = `${key.toUpperCase()} is required`;
        else if (key !== 'song' && (!values[key].length > 0))
            errors[key] = `${key.toUpperCase()} is required`;
    });


    // name validation
    if (values.name) {
        let name = values.name;
        let hasTwoWords = (name.split(' ').length === 2);
        let firstNameLength = name.split(' ')[0].length;
        let lastNameLength = hasTwoWords ? name.split(' ')[1].length : 0;
        let isFullNameValid = hasTwoWords && (firstNameLength > 1) && (lastNameLength > 1);
        if (!isFullNameValid)
            errors.name = 'NAME should consists of first name & last name.';
    }

    // age validation
    if (values.age) {
        let age = values.age;
        if ((age < 18) || (age > 120))
            errors.age = 'AGE should be above 18 and below 120.';
    }


    // email validation
    if (values.email && !/\S+@\S+\.\S+/.test(values.email))
        errors.email = "Email address is invalid";

    // song validation
    if (values.song.size) {
        let size = values.song.size / (1024 * 1024);
        let sizeLimit = 3;
        if (size > sizeLimit)
            errors.song = "Song size should be below 10 MB";
    }

    return errors;
}