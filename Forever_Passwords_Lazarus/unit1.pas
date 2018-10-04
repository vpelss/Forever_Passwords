unit Unit1;

{$mode objfpc}{$H+}

interface

uses
  Classes, SysUtils, sha1, base64, FileUtil, Forms, Controls, Graphics, Dialogs,
  StdCtrls, strutils;

type

  { TForm1 }

  TForm1 = class(TForm)
    Button1: TButton;
    Button2: TButton;
    Button3: TButton;
    ComboBox1: TComboBox;
    ComboBox2: TComboBox;
    Edit1: TEdit;
    Edit2: TEdit;
    Edit3: TEdit;
    procedure Button1Click(Sender: TObject);
    procedure Button2Click(Sender: TObject);
    procedure Button3Click(Sender: TObject);
    procedure Button4Click(Sender: TObject);
    procedure ComboBox1Change(Sender: TObject);
    procedure Edit1Change(Sender: TObject);
    procedure Edit2Change(Sender: TObject);
    procedure Edit3Change(Sender: TObject);
    procedure Edit3Enter(Sender: TObject);
    procedure FormActivate(Sender: TObject);
    procedure FormClose(Sender: TObject; var CloseAction: TCloseAction);
    procedure FormCreate(Sender: TObject);

  private
    Procedure Sha() ;

  public

  end;

var
  Form1: TForm1;

implementation

{$R *.lfm}

{ TForm1 }

Procedure TForm1.Sha() ;
var
  AliasTxt : String;
  SecretTxt : String;
  TotalTxt : String;
  SHA1Digest : TSHA1Digest;
  Sha1Str : String;
  HexValue: PChar;
  BinValue: PChar;
  BinBufSize: Integer;
  BinStr : String;
  count : Integer;
  FullString : String;
begin
  //function SHA1String(const S: String): TSHA1Digest;
AliasTxt := Edit1.Text;
SecretTxt := Edit2.Text;
TotalTxt  := SecretTxt + AliasTxt;

if ( AliasTxt = '' ) or ( SecretTxt = '' ) then
   begin
   Edit3.text := '';
   Exit;
   end;

SHA1Digest := SHA1String( TotalTxt );
  //function SHA1Print(const Digest: TSHA1Digest): String;
  Sha1Str := SHA1Print( SHA1Digest );
//function HexToBin( HexValue: PChar; BinValue: PChar; BinBufSize: Integer):Integer;
BinValue := StrAlloc(20);
HexValue := @Sha1Str[1];
BinBufSize := 20;
count := HexToBin( HexValue , BinValue , BinBufSize);
//convert PChar to String;
//BinStr :=  StrPas( BinValue );
for count := 0 to 19 do
    begin
    BinStr := BinStr + BinValue[count];
    end;
//function EncodeStringBase64( const s: string ):string;
FullString := EncodeStringBase64( BinStr );
Edit3.Text := copy( FullString , 1, StrToINt(ComboBox1.Text) );
end;

procedure TForm1.Edit1Change(Sender: TObject);
begin
   Edit1.text := DelSpace(Edit1.text);
  Sha();
end;

procedure TForm1.Button4Click(Sender: TObject);
begin

end;

procedure TForm1.ComboBox1Change(Sender: TObject);
begin
  Sha();
end;

procedure TForm1.Button2Click(Sender: TObject);
begin
  Edit1.Text := '';
  Edit2.Text := '';
  Edit3.Text := '';
end;

procedure TForm1.Button3Click(Sender: TObject);
begin
  ComboBox2.Items.Delete(ComboBox2.ItemIndex);
end;

procedure TForm1.Button1Click(Sender: TObject);
begin
  Edit3.SelectAll;
  Edit3.CopyToClipboard;
  if (ComboBox2.Items.IndexOf(Edit1.text) <> -1 ) then
     begin
     Exit;
     end;
  ComboBox2.Items.Add(Edit1.text);
end;

procedure TForm1.Edit2Change(Sender: TObject);
begin
if (Edit2.text = '' ) then
   Edit2.PasswordChar:= chr(0)
else
   Edit2.PasswordChar:= chr(5);
Sha();
end;

procedure TForm1.Edit3Change(Sender: TObject);
begin

end;

procedure TForm1.Edit3Enter(Sender: TObject);
begin
     Edit3.SelectAll;
  Edit3.CopyToClipboard;
  Edit3.SelectAll;
end;

procedure TForm1.FormActivate(Sender: TObject);
begin
if ( FileExists('alias.ini') ) then
   begin
   ComboBox2.Items.LoadFromFile('alias.ini');
   end;
end;

procedure TForm1.FormClose(Sender: TObject; var CloseAction: TCloseAction);
begin
ComboBox2.Items.SaveToFile('alias.ini');
end;

procedure TForm1.FormCreate(Sender: TObject);
begin

end;

end.

