import DeleteMembers from "../Actions/Delete/DeleteMembers";
import EditMembers from "../Actions/Edit/EditMembers";
import Styles from "./Members.module.css";

const Members = ( { noData, members } ) => {

    return (
        <>
            {
                noData && (<div>no data found</div>)
            }
            <table className={Styles.table}>
                <thead>
                    <tr>
                        <th className="checkbox"><input className={Styles.input} name="checkbox" type="checkbox"></input>
                        </th>
                        <th id="nameID">Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member) =>
                        <tr key={member.id}>
                            <td className="checkbox"><input className={Styles.input} name="checkbox" type="checkbox"></input></td>
                            <td>{member.name}</td>
                            <td>{member.email}</td>
                            <td>{member.role}</td>
                            <td className={Styles.Actions} >
                                <EditMembers />
                                <DeleteMembers />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}

export default Members;
