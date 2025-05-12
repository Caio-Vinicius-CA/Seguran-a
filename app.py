from flask import Flask, request, jsonify, render_template
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

df = pd.read_csv("dados/dados_limpos.csv")

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/dados', methods=['GET'])
def filtrar_dados():
    filtro = df.copy()

    municipio = request.args.get('municipio')
    if municipio:
        filtro = filtro[filtro['MUNICIPIO'] == municipio]

    sexo = request.args.get('sexo')
    if sexo:
        filtro = filtro[filtro['SEXO'] == sexo]

    regiao = request.args.get('regiao')
    if regiao:
        filtro = filtro[filtro['REGIAO_GEOGRAFICA'] == regiao]

    natureza = request.args.get('natureza')
    if natureza:
        filtro = filtro[filtro['NATUREZA_JURIDICA'].str.contains(natureza, case=False)]

    ano = request.args.get('ano')
    if ano:
        filtro = filtro[filtro['ANO'] == int(ano)]

    mes = request.args.get('mes')
    if mes:
        filtro = filtro[filtro['MES'] == int(mes)]

    idade = request.args.get('idade')
    if idade:
        filtro = filtro[filtro['IDADE'] == int(idade)]

    return jsonify(filtro.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)
