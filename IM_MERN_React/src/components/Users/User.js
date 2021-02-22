import React from 'react'
import moment from "moment";;

export default function User({user}) {
    
    return (
      <tr>
        <td>{user.FirstName}</td>
        <td>{user.LastName}</td>
        <td>{user.Email}</td>
        <td><span title= {moment(user.createdAt).format("MMMM DD YYYY, h:mm:ss a")}>{moment(user.createdAt).fromNow() } </span></td>
      </tr>
    );
}
