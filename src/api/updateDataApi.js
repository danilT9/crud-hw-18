export const updateDataApi = async(id, data) => {
    return await fetch(`http://localhost:3000/students/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
    }).then(res => res.json());
}