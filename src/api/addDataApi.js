export const addDataApi = async(data) => {
    return await fetch("http://localhost:3000/students", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
    }).then(res => res.json());
}