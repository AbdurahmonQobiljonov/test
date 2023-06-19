const AboutPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-4">About Vcontact</h1>
      <p className="text-gray-700">
        Vcontact is a cutting-edge communication platform that brings people together in a connected
        world. With Vcontact, you can experience a range of powerful features designed to enhance
        your communication and connection with others.
      </p>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Key Features</h2>
        <ul className="list-disc list-inside">
          <li className="mb-2">Real-time messaging for seamless communication</li>
          <li className="mb-2">User-friendly interface for easy navigation</li>
          <li className="mb-2">Secure and private conversations</li>
          <li className="mb-2">Contact list management for effortless connections</li>
          <li className="mb-2">Customizable profiles to express your personality</li>
          <li className="mb-2">Notifications for important updates</li>
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
        <p className="text-gray-700">
          At Vcontact, we believe that communication should be simple, convenient, and enjoyable.
          Our vision is to create a global community where people can connect, collaborate, and
          build meaningful relationships. We strive to continuously innovate and improve our
          platform to meet the evolving needs of our users.
        </p>
      </div>
    </div>
  )
}

export default AboutPage
