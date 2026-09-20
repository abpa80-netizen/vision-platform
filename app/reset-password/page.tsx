"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {createClient} from "../../lib/supabase";

export default function ResetPassword(){
 const [password,setPassword]=useState("");const [confirm,setConfirm]=useState("");const [error,setError]=useState("");const [message,setMessage]=useState("");const [loading,setLoading]=useState(false);const router=useRouter();
 async function submit(e:React.FormEvent){e.preventDefault();setError("");setMessage("");if(password.length<8){setError("Le mot de passe doit contenir au moins 8 caractères.");return;}if(password!==confirm){setError("Les mots de passe ne correspondent pas.");return;}setLoading(true);
 const {error}=await createClient().auth.updateUser({password});if(error)setError(error.message);else{setMessage("Mot de passe modifié. Redirection...");setTimeout(()=>router.push("/account"),800);}setLoading(false);}
 return <main className="container" style={{maxWidth:520}}><div className="card"><h1>Nouveau mot de passe</h1><form onSubmit={submit}><label>Nouveau mot de passe</label><input className="input" type="password" minLength={8} value={password} onChange={e=>setPassword(e.target.value)} required/><label>Confirmation</label><input className="input" type="password" minLength={8} value={confirm} onChange={e=>setConfirm(e.target.value)} required/>{error&&<p className="danger">{error}</p>}{message&&<p className="ok">{message}</p>}<button className="btn" disabled={loading}>{loading?"Modification...":"Modifier le mot de passe"}</button></form></div></main>
}