<?php

class Cnx
{
    private $login;
    private $pass;
    private $connec;

    public function __construct($db = 'nidal.idrissi_db', $login = 'nidal.idrissi', $pass = 'nidal.idrissi.2003_')
    {
        $this->login = $login;
        $this->pass = $pass;
        $this->db = $db;
        $this->connec();
    }

    public function getConnec() {
        return $this->connec;
    }

    private function connec()
    {
        try {
            $bdd = new PDO('mysql:host=sqletud.u-pem.fr;dbname='. $this->db . ';charset=utf8mb4', $this->login, $this->pass);
            $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
            $bdd->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
            $this->connec = $bdd;
        } catch (PDOException $e) {
            $msg = 'ERREUR PDO dans ' . $e->getFile() . ' L.' . $e->getLine() . ' : ' . $e->getMessage();
            die($msg);
        }
    }

    public function q($sql, array $cond = null)
    {
        $stmt = $this->connec->prepare($sql);

        if ($cond) {
            foreach ($cond as $v) {
                $stmt->bindParam($v[0], $v[1], $v[2]);
            }
        }

        $stmt->execute();

        return $stmt->fetchAll();
        $stmt->closeCursor();
        $stmt = NULL;
    }

    public function i($sql, array $cond = null)
    {
        $stmt = $this->connec->prepare($sql);

        if ($cond) {
            foreach ($cond as $v) {
                $stmt->bindParam($v[0], $v[1], $v[2]);
            }
        }

        $stmt->execute();
        $stmt->closeCursor();
        $stmt = NULL;
    }

    public function count($sql, array $cond = null)
    {
        $stmt = $this->connec->prepare($sql);

        if ($cond) {
            foreach ($cond as $v) {
                $stmt->bindParam($v[0], $v[1], $v[2]);
            }
        }

        $stmt->execute();

        return $stmt->rowCount();
        $stmt->closeCursor();
        $stmt = NULL;
    }

}