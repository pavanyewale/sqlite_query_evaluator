
ctype Constraint where
      Pk:Constraint
      Fk:String->Constraint
      Uq:Constraint
      Nn:Constraint
      Noc:Constraint
      
type Values=[String]
type Attributes=[(String,Constraint)]
type State=[(String,Attributes,[Values])]
state : State
state=[("student",[("rollno",Fk."stud4"),("name",Uq)],[["1","pavan1"],["2","yewale"],["5","pavan"]]),("stud4",[("rollno",Pk)],[["9"]])]

ctype Statement where
      Select:[String]->String->Condition->Statement
      Update:String->[(String,String)]->Condition->Statement
      Delete:String->Condition->Statement
      Insert:String->Values->Statement
      Createt:String->[(String,Constraint)]->Statement

ctype Condition where
      Cdtn:Bop->Field->Field->Condition
      Nocdn:Condition

ctype Bop where
      E:Bop
      Ne:Bop
      Gt:Bop
      Lt:Bop

ctype Field where
      Val:String->Field
      Atb:String->Field
      
--For Create table Statement-------------------------------------------
-----create table student (rollno text primary key,name text,address fk adress(add));
----Createt."student".[("rollno",Pk),("name",Noc),("adress",Fk."adress")]

createt : Statement -> State -> State

createt.(Createt.table.attrib).state
	|not.(tblexist.table.state)=(table,attrib,[])::state
	|otherwise=error."table allready exist !"

tblexist:String->State->Bool

tblexist.t.[]=False
tblexist.table.((x,y,z)::st)
	|table==x=True
	|otherwise=tblexist.table.st

---------------For Insert statement
-----Insert into student values ("pavan","17161","asdress");
-----Insert."student".["pavan","17161","asdress"]

insertt : Statement -> State -> State
insertt.(Insert.table.values).st
	|validate.table.values.st=[(t,a,(values::v)) |(t,a,v)<-st,t==table]++[(t,a,v) |(t,a,v)<-st,not.(t==table)]
       
validate.t.v.st
	|(tblexist.t.st)=chklength.t.v.[(t1,a,v1)|(t1,a,v1)<-st,t1==t].st
	|otherwise=error."TABLE NOT EXIST......!"

chklength.t.v.[(t1,a,v1)].st
	|length.v==length.a=chkconstraint.t.(zip.a.v).st.v1.0
	|otherwise=error."No of values passed not match with no of attributes in table"
chkconstraint.t.[].st.v1.i=True
chkconstraint.t.(((a,Pk),v)::pairs).st.v1.i
	|not.(head.([True|k<-v1,(k!!i)==v]++[False]))=chkconstraint.t.pairs.st.v1.(i+1)
	|otherwise=error.("Primary key  constraint failed for attribute "++ a )
chkconstraint.t.[].st.v1.i=True
chkconstraint.t.(((a,Uq),v)::pairs).st.v1.i
	|not.(head.([True|k<-v1,(k!!i)==v]++[False]))=chkconstraint.t.pairs.st.v1.(i+1)
	|otherwise=error.("UNIQUE key  constraint failed for attribute "++ a )

chkconstraint.t.(((a,Noc),v)::pairs).st.v1.i=True
chkconstraint.t.[].st.v1.i=True
chkconstraint.t.(((a,Nn),v)::pairs).st.v1.i
	|not.(v=="")=chkconstraint.t.pairs.st.v1.(i+1)
	|otherwise = error.("Not Null constraint failed for the attribute"++a)
chkconstraint.t.[].st.v1.i=True
chkconstraint.t.(((a,Fk.table),v)::pairs).st.v1.i
	|tblexist.table.st=findindex.[(a1,v)|(t,a1,v)<-st,t==table].a.v.t.pairs.st.v1.i
	|otherwise=error.("Table "++table++" not found for validating Foreign key constriant")
	
findindex.[(at,vl)].a.v.t.pairs.st.v3.k
	|head.([True|p<-vl,(p!!(head.[i|i<-[0...(length.at)-1],(a1,v1)<-[at!!i],a==a1])==v)]++[False])=chkconstraint.t.pairs.st.v3.(k+1)
	|otherwise=error.("Foreign key constraint failed for attribute "++a)
--	|chkconstraint.table.values.state=[(t.a.(values::v)) |(t.a.v)<-state,t==table]++[(t.a.v) |(t.a.v)<-state,not.(t==table)]



















--sqlite3 input
--SELECT rollno,name FROM stdu WHERE name="pavan"
--Gofer program input
--Select.["rollno","name"]."stud".(Cdtn.E.(Atb."name").(Val."pavan"))

--sqlite : Statement->Value

--sqlite.(Select.atb.table.cond)= [record|record<-[[(x,y) |(x,y)<-p,elem.x.atb]|p<-(head.[y|(x,y)<-state,x==table])],chkcond.record.cond]
--chkcond.r.Nocdn=True
--chkcond.record.(Cdtn.E.f1.f2)=(==).(find.f1.record).(find.f2.record)

--find.(Val.x).record=x
--find.x.[]=error.("Condtion Fails")
--find.(Atb.x).((a,v)::records)
--	|a==x=v
--	|otherwise=find.(Atb.x).records