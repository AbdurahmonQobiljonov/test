import { FullHeader } from '../../components/Header/Header.tsx'

export const Overview = () => {
  return (
    <div className="w-full h-full bg-gray-100 flex flex-col">
      <FullHeader />
      <div className="bg-gray-100 min-h-screen bg-amber-50">
        <div className="container mx-auto py-8">
          <h1 className="text-4xl font-bold mb-4">Vcontact Website Overview</h1>
          <p className="text-gray-700 mb-8">
            The Vcontact website is a modern and intuitive platform designed to connect people and
            foster communication. It provides a seamless user experience and a range of features to
            enhance communication among users.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-2">User Profiles</h2>
              <p className="text-gray-700">
                Vcontact allows users to create and manage their profiles, providing personal
                information, profile pictures, and status updates. Users can customize their
                profiles to reflect their personality and connect with others.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-2">Messaging</h2>
              <p className="text-gray-700">
                The messaging feature enables users to communicate with each other through text
                messages. It offers real-time messaging, chat history, and notifications to ensure
                smooth and uninterrupted conversations.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-2">Contact List</h2>
              <p className="text-gray-700">
                The contact list allows users to manage their connections. Users can add, remove,
                and organize their contacts, making it easier to find and communicate with their
                friends, family, or colleagues.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
