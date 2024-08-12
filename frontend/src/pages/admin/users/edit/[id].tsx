import { useLazyQuery } from "@apollo/client";
import { GET_USER_BY_ID } from '@/admin/requetes/queries/users.queries';
import { useRouter } from "next/router"
import { useEffect } from "react"

function EditUser(){
  const router = useRouter();
  const [getUser, {data, loading, error}] = useLazyQuery(GET_USER_BY_ID, {
    fetchPolicy: "no-cache"
  })
  useEffect(() => {
    if(router.query.id){
      getUser({
        variables: {
          findOneUserByIdId:router.query.id
        },
        onCompleted: (data) => {
          console.log(data)
        },
        onError: (error) => {
          console.log(error)
        }
      })
    }

  },[router.query.id, getUser])
  return <div>
    edit user
  </div>
}

export default EditUser;