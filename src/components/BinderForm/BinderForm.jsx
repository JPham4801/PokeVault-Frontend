import { useState } from "react";

const BinderForm = (props) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    set: ''
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('formData', formData);
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title-input'>Title</label>
        <input
          required
          type='text'
          name='title'
          id='title-input'
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor='description-input'>Description</label>
        <textarea
          required
          type='text'
          name='description'
          id='description-input'
          value={formData.description}
          onChange={handleChange}
        />
        <label htmlFor='set-input'>Set</label>
        <select
          required
          name='set'
          id='set-input'
          value={formData.set}
          onChange={handleChange}
        >
          <option value='journey-together'>Journey Together</option>
          <option value='prismatic-evolutions'>Prismatic Evolutions</option>
          <option value='surging-sparks'>Surging Sparks</option>
          <option value='obsidian-flames'>Obsidian Flames</option>
          <option value='paldean-fates'>Paldean Fates</option>
          <option value='evolving-skies'>Evolving Skies</option>
        </select>
        <button type='submit'>SUBMIT</button>
      </form>
    </main>
  )
};

export default BinderForm;