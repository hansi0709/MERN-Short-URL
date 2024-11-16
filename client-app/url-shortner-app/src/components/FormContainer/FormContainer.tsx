import * as React from 'react';
import axios from "axios";
import { serverUrl } from '../../helpers/constants';

/*
updateReloadState():

Container.tsx is the parent component, and it provides the updateReloadState function as a prop to FormContainer.tsx (the child).
FormContainer.tsx does not need to import Container.tsx because it does not define the function—it only receives the function through props. 
The parent (Container) is responsible for providing that function.
*/

// Define the interface for the component's props
interface IFormContainerProps {
    updateReloadState: () => void; 
    //IFormContainerProps interface expects a single prop: updateReloadState
}

const FormContainer: React.FunctionComponent<IFormContainerProps> = (props) => {
const {updateReloadState} = props; //Child Component Receives Props
const [fullUrl, setFullUrl] = React.useState<string>(""); //fullUrl = string - TypeScript generic   //(""): The argument to useState is the initial value of the state
//React's useState - return an array with two elements:
//fullUrl - holds the value of the URL that the user enters in the form
//setFullUrl - function to update this state as the user types into the input field.
                //When you want to change the value of fullUrl, you use setFullUrl(newValue).

const handleSubmit =async (e:React.FormEvent<HTMLFormElement>) => { //triggered when the form is submitted
    e.preventDefault(); // Prevent the default form submission behavior

    try{
        await axios.post(`${serverUrl}/shorturl`, { // Send a POST request to create a short URL by passing the fullUrl as the payload.
            fullUrl: fullUrl
            //property that sent in the payload/body of the POST request : actual value you're passing to that property(value stored in the state variable fullUrl)
        });
        setFullUrl(""); // Clear the input after successful submission
        updateReloadState(); // Call the updateReloadState function passed from the parent component (Container.tsx).
    } catch(error) {
        console.log(error);
    }
};

  return(
    <div className="container mx-auto p-2">
        <div className="bg-banner my-8 rounded-xl bg-cover bg-center">
            <div className='w-full h-full rounded-xl p-20 backdrop-brightness-50'>
                <h2 className='text-white text-4xl text-center pd-4'>URL Shortner</h2>
                <p className='text-white text-center pd-2 text-xl font-extralight'>Paste your untidy link to shorten it</p>
                <p className='text-white text-center pb-4 text-s font-thin'>Free tool to shorten a URL or reduce link, Use our URL shortner to create a shortened & neat link making it easy to use</p>
                
                <form onSubmit={handleSubmit}>
                    <div className='flex'>
                        <div className='relative w-full'>
                            <div className='absolute inset-y-0 start-0 flex items-center pl-2 pointer-events-none text-slate-800'>urlshortner.link</div>
                            <input type='text' placeholder='add your link' required className='block w-full p-4 pl-36 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white  focus:ring-blue-500 focus:border-blue-500'
                                value={fullUrl}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullUrl(e.target.value)}
                            />
                            <button type='submit' className='absolute top-0 end-0 p-3 text-sm font-medium h-full text-white bg-blue-700 rounded-lg border border-blue-700 focus:ring-4 focus:outline-none focuis:ring-blue-300'>Shorten URL</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
};

export default FormContainer;
