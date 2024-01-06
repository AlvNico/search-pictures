import {useState} from 'react'
import {Formik, Form,Field} from 'formik'
import './header.css'
import './content.css'
import './article.css'

const styles={
  h1:{
    textAlign:"center"
  }
}
const  App= ()=> {
  const [photos,setPhotos]=useState([])
  const open= url=> window.open(url)
  console.log({photos})
  return (
    <div>
            <h1 style={styles.h1}>Buscador imagenes</h1>
      <header>
    
        <br/><br/>
        <Formik
          initialValues={{search:''}}
          onSubmit={async values=>{

            const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`, {
              headers: {
                'Authorization': 'Client-ID qvy2y7fRCE_mIZrDJ8fevnKO8Mm29ZYhiXQSRq70mOw'
              }
            })
            const data = await response.json()
            setPhotos(data.results)
          }}  
        >
          <Form>
            <label>Ingrese palabra a buscar: </label>
            <Field name="search">

            </Field>
          </Form>
        </Formik>
      </header>
      <div className='container'>
        <div className='center'>
          {photos.map(photo =>
          
            <article key={photo.id} onClick={()=> open(photo.links.html)} >
              <img src={photo.urls.regular} />
              <p>{[photo.descriptions,photo.alt_description].join(' - ')}</p>
            </article>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
