import { useState } from "react";


const useCreateGroupController = () => {
    const [groupname, setGroupname] = useState('');
    const [description, setDescription] = useState('');


    return { groupname, setGroupname, description, setDescription };
}

export default useCreateGroupController;