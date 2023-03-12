import React, {useState} from "react";
import { useForm } from 'react-hook-form';
import { Form, Button } from "react-bootstrap";
import axios from "axios";


const ImageUpload =  () => {

  const { register, handleSubmit } = useForm()

  const [fileData, setFileData] = useState('')
  const [images, setFile] = useState('')
  const [image, setImage] = useState('')


  const onSubmit = async (data) => {
    //const file = e.target.files[0]
    const formData = new FormData()
    formData.append("file", data.file[0])
    //setUploading(true)
    const res = await fetch("http://localhost:5000/api/products/image", {
      method: "POST",
      body: formData,
  })
      .then((res) => res.json());
      alert(JSON.stringify(`${res.message}, status: ${res.status}`));
    }

      //setImage(data)
      //setUploading(false)     
  

  const handleFileChange = ({target}) => {
    setFileData(target.files[0])
    setFile(target.value)
  }

  const handleSubmiti = async (e) => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.append("image", fileData)

    await axios.post('/api/products/image', formdata)
    .then((res) => console.log("res", res.data))
    .catch((error) => console.error(error))
  }

 

  return(

    <>
       <h1>See File Input</h1>
       
       <form onSubmit={handleSubmit(onSubmit)}>
                <input type="file" {...register("file")} name="file" />

                <input type="submit" />
            </form>

    </>
    
   
    
      
    
  )

}



export default ImageUpload