import * as React from 'react';
import FormContainer from '../FormContainer/FormContainer';
import { UrlData } from '../../interface/UrlData';
import { serverUrl } from '../../helpers/constants';
import axios from 'axios'; 
import DataTable from '../DataTable/DataTable';

interface IContainerProps {
}

const Container: React.FunctionComponent<IContainerProps> = () => {
  //fetch data
  const [data, setData] = React.useState<UrlData[]>([]);
  const [reload, setReload] = React.useState<boolean>(false);

  const updateReloadState = ():void => { //return type of updateReloadState is void
    setReload (true); // Sets reload state to true, triggering re-fetch logic
  };

  const fetchTableData = async () => {
    //console.log("Data : ", data);

    try {
      const response = await axios.get(`${serverUrl}/shortUrl`);
      console.log("The response from the server is : ", response);
      
      // Access the `shortUrls` array from the response
      if (response.data && Array.isArray(response.data.shortUrls)) {
        setData(response.data.shortUrls);  // Set the fetched data to state
        setReload (false); //the useEffect will not be continuously triggered
        } else {
        console.error("Unexpected data format", response.data);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  

  React.useEffect(() => {
    fetchTableData(); // Calls the function to fetch data again whenever reload changes
  }, [reload]); // Add an empty array to ensure it runs only once // Depend on reload state

  return(
    <>
    <FormContainer updateReloadState={updateReloadState}/> 
      {/* 
        Makes FormContainer a child of Container

        Render DataTable only once, passing data as props 
        Container (the parent component) stores the data state, and the DataTable component is responsible for displaying the data.
        Since data has changed, React will also re-render the DataTable component because its props have changed.
        React’s reconciliation algorithm ensures that when a component’s state or props change, it re-renders that component to reflect the new data. 
      */}
    <DataTable updateReloadState={updateReloadState} data={data} />
    </>
  );
};

export default Container;



/*
  Trigger: updateReloadState() is called (likely when a user submits a form, or some other event happens). This sets the reload state to true.
  Side Effect: The useEffect hook, which depends on reload, detects that reload has changed to true. It then runs the fetchTableData() function.
  Data Fetching: fetchTableData() makes an HTTP request to fetch fresh data from the server.
  Updating State: After fetching the data, setData() is called to update the data state with the new data.
  Re-render: Since the data state has changed, 
              React triggers a re-render of the component where data is used, 
              and the DataTable component receives the updated data, causing the data to be displayed again 
              (i.e., the table gets "refreshed").

              React does this for two reasons:
                  Component depends on the data state to render its UI.
                  When setData() is called, React knows that the displayed UI needs to reflect the new value of data.

*/