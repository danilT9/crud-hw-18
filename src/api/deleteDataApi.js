export const deleteDataApi = async(id) => {
    return await fetch(`http://localhost:3000/students/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
    }).then(res => res.json());
}