import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Modal from "../components/Modal";

import fs from 'fs'
import path from 'path'

export default function Home({ params }) {
    const backgroundImgUrl = params.cmsUrls[0]
    const videoUrl = params.cmsUrls[1]
    const linkUrl = params.cmsUrls[3]
    console.log("videourl",videoUrl)
    

    const [showModal, setShowModal] = useState(false);

    // Show the modal when the component mounts
    useEffect(() => {
        setShowModal(true);
    }, []);

  return (
    <div className={styles.containerMain}>
        <div className ={styles.title}> <span> Cloud Data Management: </span>
        <br/><br/>
        <span> Leveraging Mongo-DB Atlas for CRUD Operations </span>
        </div>
      <video width="750" height="500" controls className={styles.video}>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={styles.github}>CodeBase Link
      <a href="https://github.com/NuminousCode/mongo-crud-app" target="_blank" className={styles.link}>
      <img src={linkUrl} alt="link" className={styles.linkIcon}/>
      </a>
      </div>
      <img src={backgroundImgUrl} alt="image" className={styles.backgroundImage} />
      <Modal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}

export async function getStaticProps(){
    // Path to Contentful asset IDs JSON file
  const filePath = path.join(process.cwd(), 'data/cmsIds.json');
  // Read and parse JSON file 
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const imgIds = JSON.parse(fileContents);
  const cmsUrls = [];
  // Retrieve access token and space ID from environment variables
  const accessToken = process.env.ACCESS_TOKEN;
  const spaceId = process.env.SPACE_ID;
  
  // Iterate over image IDs, fetch each Contentful image URL, and add it to the cmsUrls array
    for (const imgId of Object.values(imgIds[0])) {
      const url = `https://cdn.contentful.com/spaces/${spaceId}/assets/${imgId}?access_token=${accessToken}`;
      
      try {
        // Fetch Contentful image data
        const response = await fetch(url);
        const result = await response.json();
         // Extract the image URL and add it to cmsUrls array
        cmsUrls.push(result.fields.file.url);
        // Error handling
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
     // Prepare the image URLs to be passed as props to the page component
    const params = {cmsUrls}
  
     // Return the image URLs as props
    return {
      props: {
        params
      },
    };
  }
