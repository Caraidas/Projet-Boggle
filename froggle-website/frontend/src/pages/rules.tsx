import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../css/styleRules.css";

const Rules = (props: { primaryColor: string }) => {
  return (
    <>
      <Header text="Règles" />
      <div className="rulesCont" style={{ background: props.primaryColor }}>
        <h2 className="rulesTitle">Froggle, c'est quoi ?</h2>
        <p className="rulesP center">
          Bienvenue dans le jeu Boggle en version web ! Dans cette adaptation,
          vous pouvez jouer de 1 à 4 joueurs et le but est d'obtenir le plus de
          points possible pendant une partie de 3 minutes. Les mots formés à
          partir des lettres du plateau de jeu vous rapportent des points, et
          les mots avec des lettres plus rares valent plus de points.
        </p>

        <h3 className="rulesSmallTitle">Objectif du jeu</h3>
        <p className="rulesP">
          Froggle est un jeu de mots où les joueurs doivent trouver autant de
          mots que possible en un temps limité. Les mots doivent être formés en
          reliant des lettres adjacentes sur le plateau de jeu. Les lettres
          peuvent être reliées horizontalement, verticalement ou en diagonale,
          mais chaque lettre ne peut être utilisée qu'une seule fois pour former
          un mot.
        </p>

        <h3 className="rulesSmallTitle">Déroulement du jeu</h3>
        <ol className="rulesList">
          <li>
            Avant de commencer la partie, sélectionnez le nombre de joueurs et
            attendez que d'autre personnes rejoignent.
          </li>
          <li>
            Le plateau de jeu est constitué d'une grille de lettres. Chaque
            joueur observe le plateau et recherche des mots en reliant les
            lettres adjacentes pour former des mots.
          </li>
          <li>
            Les joueurs peuvent choisir des mots dans n'importe quel ordre en
            cliquant sur les lettres correspondantes sur le plateau ou en tapant
            dans la barre en dessous de la grille. Chaque mot proposé donne un
            nombre de point en fonction de sa longueur et des lettres qui le
            forme. PLus les lettres sont rares, plus le mot donne de ponts.
          </li>
          <li>
            À la fin du temps imparti (3 minutes), la partie est finie et vous
            pouvez voir si vous avez gagner ou non.
          </li>
        </ol>

        <h3 className="rulesSmallTitle center">Fin de partie</h3>
        <p className="rulesP center">
          Une fois une partie terminée, vous gagnez des points qui vous permettent
          d'augmenter de niveau.
        </p>
      </div>
    </>
  );
};

export default Rules;
