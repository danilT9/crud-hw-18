export const getDataApi = async() => {
    return await fetch("http://localhost:3000/students")
        .then(res => res.json());
}