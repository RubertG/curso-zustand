import { useEffect, useState } from "react"
import { tesloApi } from "../../../api/teslo.api"

export const RequestInfo = () => {
  const [requestInfo, setRequestInfo] = useState<unknown>()

  useEffect(() => {
    tesloApi.get("auth/private")
      .then(({ data }) => {
        setRequestInfo(data)
      }).catch((error) => {
        setRequestInfo(error)
      })
  }, [])

  return (
    <div className="overflow-x-hidden">
      <h2>Información</h2>
      <pre>
        {
          JSON.stringify(requestInfo, null, 2)
        }
      </pre>
    </div>
  )
}
