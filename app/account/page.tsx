"use client";
import {useEffect,useState} from "react";
import {createClient} from "../../lib/supabase";
import {useRouter} from "next/navigation";

export default function Account(){
 const [loading,setLoading]=useState(true); const [message,setMessage]=useState(""); const router=useRouter();
 useEffect(()=>{(async()=>{const s=createClient();const {data:{user}}=await s.auth.getUser();if(!user){router.replace("/login");return;}
 const {data:p}=await s.from("profiles").select("role").eq("id",user.id).single();
 if(p?.role==="super_admin"){router.replace("/super-admin");return;}
 const {data:m}=await s.from("store_users").select("store_id,stores(slug,name)").eq("user_id",user.id).eq("role","owner").limit(1).maybeSingle();
 if(m?.stores){const st=Array.isArray(m.stores)?m.stores[0]:m.stores;router.replace("/store/"+st.slug+"/admin");return;}
 setMessage("Votre profil est créé, mais aucune boutique propriétaire n'est encore associée.");setLoading(false);})()},[router]);
 if(loading)return <main className="container">Ouverture de votre espace...</main>;
 return <main className="container"><div className="card"><h1>Espace propriétaire</h1><p>{message}</p></div></main>;
}