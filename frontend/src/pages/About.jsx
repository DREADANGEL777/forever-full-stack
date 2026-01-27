import React from "react"
import Title from "../components/Title"
import { assets } from "../assets/frontend_assets/assets"
import NewsletterBox from "../components/NewsletterBox"

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl border-t pt-8">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="flex flex-col md:flex-row my-10 gap-16">
        <img className="w-full md:max-w-[450px]" src={assets.about_img} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis rerum laborum quae aut
            praesentium dolorem sint recusandae minus, dolore sequi iusto totam architecto,
            exercitationem molestias veritatis. Molestiae incidunt esse quisquam?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci soluta, nostrum
            mollitia fuga maxime neque expedita consectetur cum ex atque doloremque iusto quos esse
            labore aut! Nemo laborum corrupti nihil.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi necessitatibus quod
            officiis a porro dicta at suscipit dolore ullam, consectetur voluptatibus, unde quam eos
            mollitia. Nobis ea id delectus facilis?
          </p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 md:py-20 flex flex-col gap-5 ">
          <b>Quantity Assurance: </b>
          <p className="text-gray-600 ">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis aperiam atque
            molestiae consequatur iste sint velit distinctio, earum veritatis sed quaerat qui vitae
            totam tempore cum consequuntur adipisci modi accusamus.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 md:py-20 flex flex-col gap-5 ">
          <b>Convenience: </b>
          <p className="text-gray-600 ">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis aperiam atque
            molestiae consequatur iste sint velit distinctio, earum veritatis sed quaerat qui vitae
            totam tempore cum consequuntur adipisci modi accusamus.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 md:py-20 flex flex-col gap-5 ">
          <b>Exceptionals Customer Service: </b>
          <p className="text-gray-600 ">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis aperiam atque
            molestiae consequatur iste sint velit distinctio, earum veritatis sed quaerat qui vitae
            totam tempore cum consequuntur adipisci modi accusamus.
          </p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  )
}

export default About
