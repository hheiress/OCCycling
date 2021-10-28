const dynamicPostFetch = (url, item) => {
    console.log(url, item);
    fetch(`http://localhost:3000${url}`,{
        method: "POST",
        body: item,
    })
    .then(response => response.json())
    .then((result) => {
        console.log('Success:', result);
    })
    .catch((error) => {
        console.error('Error:', error);
    })
};
 
export default dynamicPostFetch;