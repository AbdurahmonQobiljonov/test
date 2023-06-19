import { DEFAULT_AVATAR } from '../../libs/constants/urls.ts'
import edit from '../../assets/icons/edit.svg'
import deleteIcon from '../../assets/icons/delete.svg'

type Props = {
  fullName: string
  imageUrl: string
  email: string
  group: string
  phoneNumber: string
  address: string
  deleteContactCard: () => void
  updateContact: () => void
}

export const ContactCard = (props: Props) => {
  const { fullName, phoneNumber, email, group, imageUrl, deleteContactCard, updateContact } = props
  return (
    <div className="w-80 border-2 border-blue-900 rounded-xl p-4 bg-white">
      <div className="flex justify-between items-start">
        <img className="w-48 h-64 rounded-xl" src={imageUrl || DEFAULT_AVATAR} alt="image" />
        <div className="flex flex-col justify-between h-64">
          <div className="flex justify-around">
            <img
              src={deleteIcon}
              alt="icon"
              onClick={deleteContactCard}
              className="cursor-pointer"
            />
            <img src={edit} alt="icon" onClick={updateContact} className="cursor-pointer" />
          </div>
          <span className="border-2 border-orange-500 w-[80px] h-[40px] text-center rounded-2xl flex items-center justify-center">
            {group || '???'}
          </span>
        </div>
      </div>

      <div className="flex flex-col mt-6 justify-between">
        <span>
          <span className="font-bold">FIO:</span> {fullName || '???'}
        </span>
        <span>
          <span className="font-bold">email:</span> {email || 'exemple@gmail.com'}
        </span>
        <span>
          <span className="font-bold">phone number:</span> {phoneNumber || '???'}
        </span>
      </div>
    </div>
  )
}
