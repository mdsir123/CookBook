
const Cuisine = ({obj}) =>{
    let {name, image, cuisine, id} = obj
    return (
        <div className="flex flex-col items-center mx-2 px-8">
          <figure className="h-32 min-w-32 rounded-full overflow-hidden my-2 shadow-xl ">
            <img className="object-cover" src={image} alt={name} />
          </figure>
          <div className="text-lg ">{cuisine}</div>
        </div>
    )
}

export default Cuisine