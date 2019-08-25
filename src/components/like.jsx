//Stateless component
import React from 'react'

const Like = props =>{
        let classes = "fa fa-heart-o"
        if(props.liked) classes = "fa fa-heart" //jika props liked nilainya true maka ubah variabel class menjadi "fa fa-heart"

        return (
            <i className={classes} aria-hidden="true" style={{cursor: 'pointer'}} onClick={props.onClick} /* menambahkan event dari props yg berasal dari movies.jsx */></i>
        )
}

export default Like

//NOTE = untuk menambahkan teks/condition didalam attribute tidak perlu membuat function. Buatlah conditional seperti variable classes diatas