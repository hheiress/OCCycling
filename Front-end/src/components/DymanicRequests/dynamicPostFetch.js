const dynamicPostFetch = (url, item, headers={}) => {
    console.log(url, item);
    fetch(`http://localhost:3000${url}`,{
        method: "POST",
        body: item,
        headers : headers
        //add header dynamic type: content type
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