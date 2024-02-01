import CategoryItem from "../category-item/category-item.component";
import './directory.component.scss';


const Directory = ({ categories }) => {
  return(
    <div className="directory-comtainer">
    {categories.map((category) => (
      <CategoryItem key={category.id} category={category} />
    ))}
    </div>
  )
}

export default Directory;

