import React from 'react';
import { useForm } from 'react-hook-form'

const EditUserForm = (props) => {

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: props.currentUser
  });

  //CAmbiar los valores en los inputs
  setValue('name', props.currentUser.name)
  setValue('username', props.currentUser.username)

  const onSubmit = (data , e) => {
    data.id = props.currentUser.id
    props.updateUser(props.currentUser.id, data)
    e.target.reset()
  }

  

  return ( 
    <form onSubmit={handleSubmit(onSubmit)}>
            
      <label>Name</label>
      <input type="text" name="name" placeholder='name' 
        {...register('name', { required: true, maxLength: 30 })}
      />
      {errors.name && errors.name.type === "required" && <span>This is required</span>}
      
            
      <label>Username</label>

      <input type="text" name="username" placeholder='username' 
        {...register('username', { required: true, maxLength: 30})}
       />
       {errors.username && errors.username.type === "required" && <span>This is required</span>}

      <button>
        Edit user</button>
    </form>

   );
}
 
export default EditUserForm;
