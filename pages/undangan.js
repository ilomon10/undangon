export const getStaticProps = async () => {

  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  const data = await res.json();

  return {
    props: {
      post: data
    }
  }
}

const Undangan = (props) => {
  console.log(props);
  return (
    <div>
      Undangan
    </div>
  )
}

export default Undangan;