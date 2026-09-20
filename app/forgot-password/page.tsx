"use client";
import {useState} from "react";
import Link from "next/link";
import {createClient} from "../../lib/supabase";

export default function ForgotPassword(){
 const [email,setEmail]=useState("");const [message,setMessage]=useState("");const [error,setError]=useState("");const [loading,setLoading]=useState(false);
 async function submit(e:React.FormEvent){e.preventDefault();setLoading(true);setError("");setMessage("");
 const {error}=await createClient().auth.resetPasswordForEmail(email.trim().toLowerCase(),{redirectTo:window.location.origin+"/reset-password"});
 if(error)setError(error.message);else setMessage("Si cette adresse existe, un lien de réinitialisation vient d'être envoyé.");
 setLoading(false);}
 return <main className="container" style={{maxWidth:520}}><div className="card"><h1>Mot de passe oublié</h1><form onSubmit={submit}><label>Email</label><input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required/>{error&&<p className="danger">{error}</p>}{message&&<p className="ok">{message}</p>}<button className="btn" disabled={loading}>{loading?"Envoi...":"Recevoir le lien"}</button></form><p><Link href="/login" className="muted">Retour à la connexion</Link></p></div></main>
}