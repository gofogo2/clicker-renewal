import { API_URL } from "../constants";
import PocketBase from 'pocketbase';
import 'cross-fetch/polyfill';
// import eventsource from 'eventsource';
// import eventsource from "react-native-sse";

// global.EventSource = eventsource;
async function getVideos(id: string) {
  const response = await fetch(`${API_URL}/${id}/videos`);

  return response.json();
}

async function loginUser() {
  try {
    const pb = new PocketBase("http://127.0.0.1:8090");
    // await pb.authStore.clear(); // 기존 인증 정보를 클리어
    //  const user = await pb.admins.authWithPassword('promoted.go@gmail.com', '1122334455');
    // console.log(user); // 로그인 성공 시 사용자 정보 출력 

    

    const a = await pb.collection('posts').getList(1,20,{cache:'no-cache'});

    await pb.collection('posts').subscribe('*',function(e){
      console.log(e);
     });
    

    //  console.log(a);

    const data = new FormData();
    data.set('title','33333333333');
    data.set('content','4444444444');
    await pb.collection('posts').create(data);

    // console.log(a.findLast(a=>a).title);
  } catch (error) {
    console.error(error);
  }
}

export default async function MovieVideos({ id }: { id: string }) {
  // const pb = new PocketBase("http://127.0.0.1:8090")
  const videos = await getVideos(id);
  // const aa = await pb.collections.getFullList();
  loginUser();
  // const data = {
  //   username:'gofogo',
  //   email:'promoted.go@gmail.com',
  //   password:'112233',
  //   passwordConfirm:'112233',
  //   name:'고승진'
  // }

  // console.log(pb.baseUrl);


  // console.log(aa);
  return (
    <div>
      {videos.map((video) => (
        <iframe
          key={video.id}
          src={`https://youtube.com/embed/${video.key}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={video.name}
        />
      ))}
    </div>
  );
}