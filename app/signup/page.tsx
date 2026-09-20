"use client";
import {useState} from "react";
import {createClient} from "../../lib/supabase";
import {useRouter} from "next/navigation";
import Link from "next/link";

function makeSlug(value:string){
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60);
}

export default function Signup(){
  const [fullName,setFullName]=useState("");
  const [storeName,setStoreName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [confirm,setConfirm]=useState("");
  const [error,setError]=useState("");
  const [message,setMessage]=useState("");
  const [loading,setLoading]=useState(false);
  const router=useRouter();

  async function submit(e:React.FormEvent){
    e.preventDefault(); setError(""); setMessage("");
    if(password.length<8){setError("Le mot de passe doit contenir au moins 8 caractères.");return;}
    if(password!==confirm){setError("Les mots de passe ne correspondent pas.");return;}
    if(!storeName.trim()){setError("Le nom de la boutique est obligatoire.");return;}
    setLoading(true);
    const supabase=createClient();
    const {data,error}=await supabase.auth.signUp({
      email:email.trim().toLowerCase(),
      password,
      options:{data:{full_name:fullName.trim()||email.split("@")[0],store_name:storeName.trim(),store_slug:makeSlug(storeName)}}
    });
    if(error){setError(error.message);setLoading(false);return;}
    if(data.session){
      router.push("/account");
      return;
    }
    setMessage("Compte créé. Vérifiez votre adresse e-mail si une confirmation est demandée, puis connectez-vous.");
    setLoading(false);
  }

  return <main className="container" style={{maxWidth:620}}>
    <div className="card">
      <div className="muted">VISION SHOP · ESPACE PROPRIÉTAIRE</div>
      <h1>Créer votre boutique</h1>
      <p className="muted">Votre compte propriétaire et votre boutique sont créés automatiquement après l'inscription.</p>
      <form onSubmit={submit}>
        <label>Nom complet</label>
        <input className="input" value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="Votre nom"/>
        <label>Nom de la boutique</label>
        <input className="input" value={storeName} onChange={e=>setStoreName(e.target.value)} placeholder="Ma Boutique" required/>
        <label>Email</label>
        <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="vous@exemple.com" required/>
        <label>Mot de passe</label>
        <input className="input" type="password" minLength={8} value={password} onChange={e=>setPassword(e.target.value)} required/>
        <label>Confirmer le mot de passe</label>
        <input className="input" type="password" minLength={8} value={confirm} onChange={e=>setConfirm(e.target.value)} required/>
        {error&&<p className="danger">{error}</p>}
        {message&&<p className="ok">{message}</p>}
        <button className="btn" disabled={loading}>{loading?"Création...":"Créer mon compte et ma boutique"}</button>
      </form>
      <p>Déjà inscrit ? <Link href="/login" className="muted">Se connecter</Link></p>
    </div>
  </main>
}