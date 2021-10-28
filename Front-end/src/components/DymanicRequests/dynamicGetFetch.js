const dynamicGetFetch = async (url) => {
    const response = await fetch(`http://localhost:3000${url}`);
    const dataPromise = await response.json();
    return dataPromise;
  }
 
export default dynamicGetFetch;