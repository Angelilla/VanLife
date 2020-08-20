import React, { Component } from "react";

import { withAuth } from "../lib/AuthProvider";	

import service from '../lib/photo-service';

class AddPic extends Component {

    state = { profilepic: "" };
    

    handleChange = e => {  
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleFileUpload = e => {
        console.log("The file to be uploaded is: ", e.target.files[0]);

        const uploadData = new FormData();

        uploadData.append("profilepic", e.target.files[0]);
        
        service.handleUpload(uploadData)
        .then(response => {
            console.log('response is: ', response);

            this.setState({ profilepic: response.secure_url });
        })
        .catch(err => {
            console.log("Error while uploading the file: ", err);
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        
        service.saveNewPhoto(this.state)
        .then(res => {
            console.log('added: ', res);
        })
        .catch(err => {
            console.log("Error while adding the thing: ", err);
        });
    }  

    render() {
        return (
          <div>
            <h2>New Pic</h2>
            <form encType="multipart/form-data" onSubmit={e => this.handleSubmit(e)}>

                <input 
                    type="file" 
                    onChange={(e) => this.handleFileUpload(e)} 
                /> 

                <button type="submit">Save new thing</button>
            </form>
          </div>
        );
    }

}

export default withAuth(AddPic);